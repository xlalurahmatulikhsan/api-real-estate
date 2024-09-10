import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        users: {
          some: {
            id: tokenUserId,
          },
        },
        isDeleted: false,
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        messages: {
          where: {
            isDeleted: false,
          },
        },
      },
    });

    const formattedChats = chats.map((chat) => ({
      ...chat,
      receiver: chat.users.find((user) => user.id !== tokenUserId) || null,
    }));

    res.status(200).json(formattedChats);
  } catch (err) {
    res.status(500).json({ message: "Fialed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: req.params.id,
        users: {
          some: {
            id: tokenUserId,
          },
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            text: true,
            createdAt: true,
            userId: true,
          },
        },
        users: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!chat) {
      return res
        .status(404)
        .json({ message: "Chat not found or access denied." });
    }

    if (!chat.seenBy.includes(tokenUserId)) {
      await prisma.chat.update({
        where: { id: req.params.id },
        data: {
          seenBy: {
            set: Array.from(new Set([...chat.seenBy, tokenUserId])), // Avoid duplicate entries
          },
        },
      });
    }

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const { receiverId } = req.body;

  try {
    if (!receiverId || tokenUserId === receiverId) {
      return res.status(400).json({ message: "Invalid receiver ID." });
    }

    const existingChat = await prisma.chat.findFirst({
      where: {
        users: {
          every: {
            id: {
              in: [tokenUserId, receiverId],
            },
          },
        },
      },
    });

    if (existingChat) {
      return res.status(400).json({ message: "Chat already exists." });
    }

    const newChat = await prisma.chat.create({
      data: {
        users: {
          connect: [{ id: tokenUserId }, { id: receiverId }],
        },
      },
    });

    res.status(200).json(newChat);
  } catch (err) {
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        users: {
          some: {
            id: tokenUserId,
          },
        },
      },
      data: {
        seenBy: {
          set: Array.from(new Set([tokenUserId])),
        },
      },
    });

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: "Failed to read chat!" });
  }
};

export const softDeleteChat = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.id;

  try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        users: {
          some: {
            id: tokenUserId,
          },
        },
      },
    });

    if (!chat) {
      return res
        .status(404)
        .json({ message: "Chat not found or access denied!" });
    }

    await prisma.chat.update({
      where: { id: chatId },
      data: { isDeleted: true },
    });

    res.status(200).json({ message: "Chat soft deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to soft delete chat!" });
  }
};

export const hardDeleteChat = async (req, res) => {
  const chatId = req.params.id;

  try {
    await prisma.chat.delete({
      where: { id: chatId },
    });

    res.status(200).json({ message: "Chat hard deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to hard delete chat!" });
  }
};
