const evolutionService = require("../services/evolution.service");

exports.getStatus = async (req, res, next) => {
  try {
    const data = await evolutionService.getInstanceStatus();

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getQRCode = async (req, res, next) => {
  try {
    const data = await evolutionService.getQRCode();

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getChats = async (req, res, next) => {
  try {
    const chats = await evolutionService.getChats();

    return res.json({
      success: true,
      total: chats.length,
      data: chats,
    });
  } catch (error) {
    next(error);
  }
};

exports.getChatById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const chat = await evolutionService.getChatById(id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat não encontrado",
      });
    }

    return res.json({
      success: true,
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};
