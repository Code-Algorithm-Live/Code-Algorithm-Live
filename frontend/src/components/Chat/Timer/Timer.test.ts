import { timerFormatter } from '.';

describe('타이머 00:00:00 형식으로 포맷팅', () => {
  test('12:12:12, 모두 두자리수 일 때', () => {
    expect(timerFormatter({ hours: 12, minutes: 12, seconds: 12 })).toBe(
      '12:12:12',
    );
  });
  test('12:12:01 초가 한자리수 일 때', () => {
    expect(timerFormatter({ hours: 12, minutes: 12, seconds: 1 })).toBe(
      '12:12:01',
    );
  });
  test('12:12:00 초가 0 일 때', () => {
    expect(timerFormatter({ hours: 12, minutes: 12, seconds: 0 })).toBe(
      '12:12:00',
    );
  });
  test('02:01:00 시가 한자리수 일 때', () => {
    expect(timerFormatter({ hours: 2, minutes: 1, seconds: 0 })).toBe(
      '02:01:00',
    );
  });
  test('12:10 분, 초로 구성될 때', () => {
    expect(timerFormatter({ hours: 0, minutes: 12, seconds: 10 })).toBe(
      '12:10',
    );
  });
  test('00:10 분으로 구성 될 떄', () => {
    expect(timerFormatter({ hours: 0, minutes: 0, seconds: 10 })).toBe('00:10');
  });
  test('00:00 모두 0일 때', () => {
    expect(timerFormatter({ hours: 0, minutes: 0, seconds: 0 })).toBe('00:00');
  });
});
