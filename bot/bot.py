from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, KeyboardButton, ReplyKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes, CallbackQueryHandler
from datetime import datetime
import os

BOT_TOKEN = "8072038057:AAG76HusATaqMFZwZOPUbo2NCHKr0TYngGU"
ADMIN_CHAT_ID = 8101156971
CHANNEL_ID = "-1003402792259"
WEB_APP_URL = "https://hadyaland.vercel.app/"

users_data = {}  # {"username": {"orders": []}}
purchase_counter = 0  # Xaridlar uchun ID hisoblagichi

base_keyboard = [
    [KeyboardButton("/start")],
    [KeyboardButton("/profile")]
]

def get_keyboard(show_cancel=False):
    keyboard = base_keyboard.copy()
    if show_cancel:
        keyboard.append([KeyboardButton("/cancel")])
    return ReplyKeyboardMarkup(keyboard, resize_keyboard=True, one_time_keyboard=False)

def generate_purchase_id():
    global purchase_counter
    purchase_counter += 1
    return f"#{purchase_counter:06d}"

# /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    username = user.username or str(user.id)
    if username not in users_data:
        users_data[username] = {"orders": []}

    keyboard = InlineKeyboardMarkup([[InlineKeyboardButton("Open 🌐", url=WEB_APP_URL)]])
    await update.message.reply_text(
        f"Salom {user.first_name}!\n\nBuyurtma berish uchun iltimos, pastdagi Open 🌐 tugmasini bosib dasturni ishga tushiring.",
        reply_markup=keyboard
    )
    await update.message.reply_text("Buyruqlar paneli:", reply_markup=get_keyboard(show_cancel=False))

# /profile
async def profile(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    username = user.username or str(user.id)
    if username not in users_data:
        users_data[username] = {"orders": []}

    profile_text = f"👤 Profilingiz:\n\n🛒 Buyurtmalar tarixi:\n"
    if users_data[username]["orders"]:
        for order in users_data[username]["orders"]:
            profile_text += (
                f"{order['purchase_id']} - Gift: {order['gift']}\n"
                f"   Kim uchun: {order['for_user']}\n"
                f"   Summasi: {order['amount']} so'm\n"
                f"   Sana: {order['date']}\n"
                f"   Holati: {order.get('status','kutmoqda')}\n\n"
            )
    else:
        profile_text += "Siz hali hech narsa sotib olmadingiz."
    await update.message.reply_text(profile_text, reply_markup=get_keyboard(show_cancel=False))

# /cancel
async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Xarid jarayoni bekor qilindi.", reply_markup=get_keyboard(show_cancel=False))

# /buy
async def buy(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # /buy komanda hozircha faqat yo‘l-yo‘riq xabari beradi
    await update.message.reply_text(
        "Buyurtma berish uchun avval Open 🌐 tugmasini bosib dasturni ishga tushiring, keyin buyurtma berishingiz mumkin.",
        reply_markup=get_keyboard(show_cancel=False)
    )

if __name__ == "__main__":
    os.makedirs("receipts", exist_ok=True)
    app = ApplicationBuilder().token(BOT_TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("profile", profile))
    app.add_handler(CommandHandler("cancel", cancel))
    app.add_handler(CommandHandler("buy", buy))

    print("Bot ishga tushdi...")
    app.run_polling()
