import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return res.status(404).json({ message: "User not found!" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) res.status(403).json({ message: "Not authorized!" });

  try {
    const dataToUpdate = {
      ...inputs,
      ...(password && { password: await bcrypt.hash(password, 10) }),
      ...(avatar && { avatar }),
    };

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });

    const { password: userPassword, ...rest } = updatedUser;

    res.status(200).json({ message: "Updated user successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user!" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) res.status(403).json({ message: "Not authorized!" });

  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user!" });
  }
};

export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });

      res.status(200).json({ message: "Post removed from saved list" });
    } else {
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      });

      res.status(200).json({ message: "Post saved successfully" });
    }
  } catch (err) {
    console.error("Error saving or removing post: ", err);
    res.status(500).json({ message: "Failed to save or remove post." });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });
    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    });

    const savedPosts = saved.map((item) => item.post);
    res.status(200).json({ userPosts, savedPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};

export const getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chatCount = await prisma.chat.count({
      where: {
        users: {
          some: {
            id: tokenUserId,
          },
        },
        NOT: {
          seenBy: {
            has: tokenUserId,
          },
        },
      },
    });

    res.status(200).json(chatCount);
  } catch (err) {
    console.error("Error fetching notification number: ", err);
    res.status(500).json({ message: "Failed to get notification number!" });
  }
};
