import json
import os
from pathlib import Path

from telegram import Update
from telegram.ext import Application, ContextTypes, MessageHandler, filters


def load_env_file() -> None:
    env_path = Path(__file__).with_name('.env')
    if not env_path.exists():
        return

    for line in env_path.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue

        key, value = line.split('=', 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def format_response(data: str) -> str:
    try:
        payload = json.loads(data)
    except json.JSONDecodeError:
        payload = {}

    selected_activity = payload.get('selectedActivity') or 'Not specified'
    selected_day = payload.get('selectedDay') or 'Not specified'
    selected_time = payload.get('selectedTime') or 'Not specified'

    return (
        '❤️ New Ask Out Response\n\n'
        f'Choice 1:\n{selected_activity}\n\n'
        f'Choice 2:\n{selected_day}\n\n'
        f'Choice 3:\n{selected_time}'
    )


async def handle_web_app_data(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    chat_id = os.environ['TELEGRAM_CHAT_ID']
    web_app_data = update.effective_message.web_app_data
    message = format_response(web_app_data.data if web_app_data else '')
    await context.bot.send_message(chat_id=chat_id, text=message)


def main() -> None:
    load_env_file()

    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')

    if not bot_token or not chat_id:
        raise RuntimeError('TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set in .env')

    app = Application.builder().token(bot_token).build()
    app.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, handle_web_app_data))
    app.run_polling()


if __name__ == '__main__':
    main()
