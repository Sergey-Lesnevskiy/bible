import * as Sentry from '@sentry/react-native';

type ErrorInput = string | Error;

export class Logger {
  /**
   * Проброс ошибки в Sentry
   * @param title - Заголовок ошибки (человекочитаемый)
   * @param error - Текст ошибки или объект Error
   * @param context - Массив строк (например, ["ProfileScreen", "fetchUser"])
   * @param entity - Сущность/строка (например, "userId:123")
   */
  static error(
    title: string,
    error: ErrorInput,
    context: string[] = [],
    entity?: string,
  ) {
    context.forEach((value, index) => {
      Sentry.setTag(`context_${index}`, value);
    });

    if (entity) {
      Sentry.setExtra('entity', entity);
    }

    Sentry.setTag('title', title);

    const err = typeof error === 'string' ? new Error(error) : error;

    Sentry.captureException(err);
  }

  /**
   * Логирование информационного сообщения
   */
  static message(
    title: string,
    msg: string,
    context: string[] = [],
    entity?: string,
  ) {
    context.forEach((value, index) => {
      Sentry.setExtra(`context_${index}`, value);
    });

    if (entity) {
      Sentry.setExtra('entity', entity);
    }

    Sentry.setTag('title', title);

    Sentry.captureMessage(msg);
  }

  /**
   * Добавление breadcrumb (след действий пользователя)
   */
  static breadcrumb(message: string, category = 'log') {
    Sentry.addBreadcrumb({
      category,
      message,
      level: 'info',
    });
  }
}
