const axios = require("axios");

const { EVOLUTION } = require("../config/env");

const api = axios.create({
  baseURL: EVOLUTION.URL,
  headers: {
    apikey: EVOLUTION.API_KEY,
    "Content-Type": "application/json",
  },
});

exports.getInstanceStatus = async () => {
  try {
    const response = await api.get(
      `/instance/connectionState/${EVOLUTION.INSTANCE}`,
    );

    return response.data;
  } catch (error) {
    throw handleEvolutionError(error);
  }
};

exports.getQRCode = async () => {
  try {
    const response = await api.get(`/instance/connect/${EVOLUTION.INSTANCE}`);

    return response.data;
  } catch (error) {
    throw handleEvolutionError(error);
  }
};

exports.getChats = async (instance) => {
  console.log(instance);
  try {
    const response = await api.post(
      //`/chat/findChats/${EVOLUTION.INSTANCE}`,
      `/chat/findChats/${instance}`,
      {},
    );

    const chats = response.data || [];

    return chats.map((chat) => {
      const jid = chat.remoteJid || "";

      const isGroup = jid.endsWith("@g.us");

      return {
        id: jid,

        name:
          chat.name ||
          chat.subject ||
          chat.contactName ||
          chat.pushName ||
          formatJid(jid),

        phone: !isGroup ? extractPhone(jid) : null,

        isGroup,

        lastMessage: extractMessageContent(chat.lastMessage?.message),

        timestamp: chat.lastMessage?.messageTimestamp || null,

        unreadCount: chat.unreadCount || 0,
      };
    });
  } catch (error) {
    throw handleEvolutionError(error);
  }
};

exports.getChatById = async (instance, chatId) => {
  try {
    const response = await api.post(
      //`/chat/findMessages/${EVOLUTION.INSTANCE}`,
      `/chat/findMessages/${instance}`,
      {
        where: {
          key: {
            remoteJid: chatId,
          },
        },
      },
    );

    const messages = response.data?.messages?.records || [];

    if (!messages.length) {
      return null;
    }

    return {
      id: chatId,

      name: messages[0]?.pushName || chatId,

      total: messages.length,

      messages: messages.map((message) => ({
        id: message.key?.id,

        fromMe: message.key?.fromMe || false,

        messageType: message.messageType,

        message: extractMessageContent(message.message),

        timestamp: message.messageTimestamp || null,

        pushName: message.pushName || null,
      })),
    };
  } catch (error) {
    throw handleEvolutionError(error);
  }
};

function formatJid(jid) {
  if (!jid) return "Sem nome";

  return jid
    .replace("@s.whatsapp.net", "")
    .replace("@lid", "")
    .replace("@g.us", "");
}

function extractPhone(jid) {
  if (!jid) return null;

  return jid
    .replace("@s.whatsapp.net", "")
    .replace("@lid", "")
    .replace(/[^0-9]/g, "");
}

function extractMessageContent(message) {
  if (!message) return "";

  return (
    message.conversation ||
    message.extendedTextMessage?.text ||
    message.imageMessage?.caption ||
    message.videoMessage?.caption ||
    message.documentMessage?.caption ||
    "[Mensagem sem texto]"
  );
}

function handleEvolutionError(error) {
  console.log("===== EVOLUTION ERROR =====");

  if (error.response) {
    console.log(error.response.data);

    return {
      status: error.response.status,
      message: error.response.data?.message || "Erro Evolution",
      details: error.response.data,
    };
  }

  console.log(error.message);

  return {
    status: 500,
    message: error.message || "Erro interno",
  };
}
