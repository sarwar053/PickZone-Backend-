export const getUserinfo = async (req, res) => {
  try {
    const user = req.user; // already attached by isAuthenticated middleware

    
    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};