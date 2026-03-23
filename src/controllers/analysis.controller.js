/**
 * Controller for text analysis logic.
 */
const analyzeText = (req, res) => {
    try {
        const { text } = req.body;

        if (typeof text !== 'string') {
            return res.status(400).json({ error: 'Input must be a string.' });
        }

        // Word count: Split by whitespace and filter out empty strings
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;

        // Character count: Raw length
        const charCount = text.length;

        // Character count without spaces
        const charCountNoSpaces = text.replace(/\s+/g, '').length;

        res.status(200).json({
            wordCount,
            charCount,
            charCountNoSpaces,
            success: true
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = {
    analyzeText
};
