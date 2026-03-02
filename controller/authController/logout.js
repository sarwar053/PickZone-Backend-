

export const logoutController = async (req, res) => {
  try {
    // Clear the authorization token
    res.clearCookie('pickToken');
    
    // Alternatively, if using Bearer tokens:
    // Remove the token from the Authorization header
    // Note: This is just an example - client must handle token removal
    req.headers['authorization'] = '';

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: error.message
    });
  }
};
