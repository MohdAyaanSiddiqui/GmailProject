import { Email } from "../models/email.model.js";

export const createEmail = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("USER ID:", req.id);

        const { to, subject, message} = req.body || {};

        if (!req.id) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        if (!to || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const email = await Email.create({
            to,
            subject,
            message,
            userId: req.id,
        });

        return res.status(201).json({
            success: true,
            email
        });

    } catch (error) {
        console.error("CREATE EMAIL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};
export const deleteEmail = async (req, res) => {
    try {
        const emailId = req.params.id;

        if (!emailId) return res.status(400).json({ message: "Email Id Requried" });

        const email = await Email.findByIdAndDelete(emailId);

        if (!email) return res.status(404).json({ message: "Email Not Found" });

        return res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        console.log(error)
    }
}

export const getAllEmailById = async (req, res) => {
    try {
        const userId = req.id;

        const emails = await Email.find({ userId });

        return res.status(200).json({ emails });
    } catch (error) {
        console.log(error)
    }
}