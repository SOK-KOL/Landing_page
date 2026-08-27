require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/api/booking', async (req, res) => {
    const { name, email, phone, datetime, comment } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({
            success: false,
            message: 'Заполните все обязательные поля'
        });
    }

    try {
        await transporter.sendMail({
            from: `"Rest Ресторан" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `Новое бронирование от ${name}`,
            html: `
                <h2>Новое бронирование</h2>
                <p><strong>Имя:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Телефон:</strong> ${phone}</p>
                ${datetime ? `<p><strong>Дата и время:</strong> ${datetime}</p>` : ''}
                ${comment ? `<p><strong>Комментарий:</strong><br>${comment}</p>` : ''}
                <hr>
                <p><strong>Заявка создана:</strong> ${new Date().toLocaleString('ru-RU')}</p>
            `
        });

        res.json({
            success: true,
            message: 'Заявка отправлена!'
        });

    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({
            success: false,
            message: 'Ошибка при отправке'
        });
    }
});

app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        time: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});