package com.ssafy.coala.domain.Compiler.Controller;

import com.ssafy.coala.domain.Compiler.Dto.CompileRequest;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.tools.JavaCompiler;
import javax.tools.JavaFileObject;
import javax.tools.StandardJavaFileManager;
import javax.tools.ToolProvider;
import java.io.*;
import java.util.ArrayDeque;
import java.util.Collections;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/compiler")
public class CompilerController {

    int numOfDirectory = 4;
    Queue<Integer> directoryPool;
    @PostConstruct
    private void construct(){
        directoryPool = new ArrayDeque<>();
        for (int i=0; i<numOfDirectory; i++){
            directoryPool.add(i);
        }
    }

    private int take(){
        if (directoryPool.isEmpty())
            return numOfDirectory++;
        return directoryPool.poll();
    }

    private void release(int i){
        directoryPool.add(i);
    }

    @PostMapping("")
    private ResponseEntity<String> compile(@RequestBody CompileRequest compileRequest){
        String result = compileAndExecute(compileRequest.getCode(), compileRequest.getInput(), take());
        return ResponseEntity.ok(result);
    }

    private static final String OUTPUT_DIRECTORY = "compiled_code";

    //Docker에서 기본적인 보안은 해결해준다?
    public static String compileAndExecute(String code, String input, int num) {
        try {
            // Create a directory for compiled code if it doesn't exist
            File outputDirectory = new File(OUTPUT_DIRECTORY+num);
            if (!outputDirectory.exists()) {
                outputDirectory.mkdir();
            }

            // Write code to a temporary file in the specified directory
            File sourceFile = new File(outputDirectory, "Main.java");
            try (FileWriter writer = new FileWriter(sourceFile)) {
                writer.write(code);
            }
            // Compile the code
            if (compileCode(sourceFile)) {
                // Execute the compiled code
                return executeCompiledCode("Main", input, outputDirectory);
            } else {
                return "Compilation Error";
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return "Error occurred during code execution.";
        }
    }

    private static boolean compileCode(File sourceFile) throws IOException {
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        StandardJavaFileManager fileManager = compiler.getStandardFileManager(null, null, null);

        Iterable<? extends JavaFileObject> compilationUnits =
                fileManager.getJavaFileObjectsFromFiles(Collections.singletonList(sourceFile));

        StringWriter errorWriter = new StringWriter();
        JavaCompiler.CompilationTask task = compiler.getTask(
                errorWriter,
                fileManager,
                null,
                null,
                null,
                compilationUnits
        );

        boolean success = task.call();

        fileManager.close();

        if (!success) {
            System.out.println("Compilation Error:\n" + errorWriter.toString());
        }

        return success;
    }

    private static String executeCompiledCode(String className, String input, File outputDirectory)
            throws IOException, InterruptedException {
        Process process = new ProcessBuilder("java", "-cp", outputDirectory.getPath(), className)
                .redirectInput(ProcessBuilder.Redirect.PIPE)
                .redirectOutput(ProcessBuilder.Redirect.PIPE)
                .redirectError(ProcessBuilder.Redirect.PIPE)
                .start();

        try (OutputStream outputStream = process.getOutputStream()) {
            outputStream.write(input.getBytes());
        }

        // Capture and return the output
        try (InputStream inputStream = process.getInputStream();
             InputStream errorStream = process.getErrorStream();
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
             BufferedReader errorReader = new BufferedReader(new InputStreamReader(errorStream));
        ){

            StringBuilder output = new StringBuilder();
            String line;
            StringBuilder error = new StringBuilder();

            boolean exitCode;
            exitCode = process.waitFor(3, TimeUnit.SECONDS);
            if (process.isAlive()) {
                //Time Over
                process.destroyForcibly();
                System.out.println("Time Over");
            }

            while ((line = reader.readLine()) != null) {
                //output result
                output.append(line).append("\n");
            }

            while ((line = errorReader.readLine()) != null) {
                //runtime error
                error.append(line).append("\n");
            }

            if (!error.isEmpty()){
                //runtime error message
                System.out.println("Error Output:\n" + error);
            }

            return output.toString();
        }
    }
}
