const express = require("express");

const router = express.Router();

const whatsappController = require("../controllers/whatsapp.controller");

router.get("/status", whatsappController.getStatus);

router.get("/qrcode", whatsappController.getQRCode);

router.get("/chats/:instance", whatsappController.getChats);

router.get("/chat/:instance/:id", whatsappController.getChatById);

module.exports = router;
