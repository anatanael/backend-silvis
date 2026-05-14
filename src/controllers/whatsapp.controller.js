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
    const { instance } = req.params;
    const chats = await evolutionService.getChats(instance);

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
    const { instance, id } = req.params;

    const chat = await evolutionService.getChatById(instance, id);

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
