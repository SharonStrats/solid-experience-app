// /api/new-tracker
// POST /api/new-tracker

// can add async...
const handler  = (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;

        const { all data i expect } = data;

        res.status(201).json({ message: 'whatever you want to say'})
    }
}

export default handler;