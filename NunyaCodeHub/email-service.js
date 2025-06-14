// NunyaCode Hub - Email Service
// Handles automatic sending of personalized welcome emails using SendGrid

const sgMail = require("@sendgrid/mail");

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
    console.error("SENDGRID_API_KEY not found in environment variables");
}

// Email template system
const emailTemplates = {
    courseData: {
        "data-analytics": {
            name: "Data Analytics Mastery",
            schedule: "Sundays, 10:00 AM - 1:00 PM GMT",
            duration: "12 weeks",
            outline: [
                {
                    weeks: "Week 1-3",
                    topic: "Excel Fundamentals",
                    description:
                        "Master data manipulation and basic analysis in Excel",
                },
                {
                    weeks: "Week 4-6",
                    topic: "SQL Database Management",
                    description:
                        "Learn to query and manage databases effectively",
                },
                {
                    weeks: "Week 7-9",
                    topic: "Python for Data Analysis",
                    description:
                        "Dive into Python programming for data science",
                },
                {
                    weeks: "Week 10-12",
                    topic: "Power BI & Capstone Project",
                    description:
                        "Create stunning dashboards and complete your portfolio project",
                },
            ],
        },
        "web-design": {
            name: "Modern Web Design",
            schedule: "Saturdays, 10:00 AM - 1:00 PM GMT",
            duration: "16 weeks",
            outline: [
                {
                    weeks: "Week 1-4",
                    topic: "HTML/CSS Foundations",
                    description:
                        "Build solid foundations in web markup and styling",
                },
                {
                    weeks: "Week 5-8",
                    topic: "JavaScript Interactivity",
                    description: "Add dynamic behavior to your websites",
                },
                {
                    weeks: "Week 9-12",
                    topic: "Figma Design Systems",
                    description:
                        "Master professional design tools and workflows",
                },
                {
                    weeks: "Week 13-16",
                    topic: "Responsive Design & Capstone",
                    description:
                        "Create mobile-friendly sites and showcase your skills",
                },
            ],
        },
    },

    pricingInfo: {
        total: "300 GHS",
        monthly: "100 GHS/month",
        monthlyPeriod: "3 months",
        justification:
            "This investment supports our world-class instructors, cutting-edge learning platforms, and comprehensive career support services that make NunyaCode Hub the premier tech training destination in Africa.",
    },

    generateWelcomeEmail: function (studentData) {
        const { firstName, lastName, email, course } = studentData;
        const fullName = `${firstName} ${lastName}`;
        const courseInfo = this.courseData[course];

        if (!courseInfo) {
            throw new Error(`Course "${course}" not found in template system`);
        }

        const outlineHTML = courseInfo.outline
            .map(
                (item) => `
            <div style="background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 3px solid #00ffcc;">
                <div style="font-weight: 600; color: #2e4374;">${item.weeks}</div>
                <div style="font-weight: 500; color: #1a1f2e; margin: 5px 0;">${item.topic}</div>
                <div style="color: #6c7a89; font-size: 14px;">${item.description}</div>
            </div>
        `,
            )
            .join("");

        const emailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to NunyaCode Hub - Your Tech Journey Begins!</title>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1f2e; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
    <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #00ffcc;">
            <div style="font-family: 'Orbitron', monospace; font-size: 24px; font-weight: 900; color: #00ffcc; margin-bottom: 10px;">NunyaCode Hub</div>
            <div style="color: #6c7a89; font-style: italic;">Where Knowledge Meets Code</div>
        </div>

        <div style="font-size: 18px; color: #2e4374; margin-bottom: 20px;">
            Hello ${fullName}! 🎉
        </div>

        <p>We are absolutely thrilled to welcome you to the NunyaCode Hub family! Your journey into the exciting world of technology starts here, and we couldn't be more excited to be part of your transformation.</p>

        <div style="background: linear-gradient(135deg, #2e4374, #4a2c6f); color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">${courseInfo.name}</div>
            <div>You've chosen an incredible path that will equip you with industry-relevant skills and open doors to amazing opportunities in Africa's growing tech ecosystem.</div>
        </div>

        <div style="margin: 25px 0;">
            <div style="font-size: 18px; font-weight: 600; color: #2e4374; margin-bottom: 15px; border-left: 4px solid #00ffcc; padding-left: 12px;">📋 Application Confirmation</div>
            <p>We have successfully received your application for the <strong>${courseInfo.name}</strong> program. Our admissions team will review your application within <strong>5-7 business days</strong> and get back to you with next steps.</p>
            
            <div style="background: #fff3cd; color: #856404; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0; border: 1px solid #ffeaa7;">
                <strong>🚀 Program Launch Date: July 7, 2025</strong><br>
                Mark your calendar! This is when your transformation begins.
            </div>
        </div>

        <div style="margin: 25px 0;">
            <div style="font-size: 18px; font-weight: 600; color: #2e4374; margin-bottom: 15px; border-left: 4px solid #00ffcc; padding-left: 12px;">🎯 Your ${courseInfo.name} Journey</div>
            <p>Here's what you can expect over the next ${courseInfo.duration}:</p>
            ${outlineHTML}
        </div>

        <div style="margin: 25px 0;">
            <div style="font-size: 18px; font-weight: 600; color: #2e4374; margin-bottom: 15px; border-left: 4px solid #00ffcc; padding-left: 12px;">📅 Schedule & Learning Platforms</div>
            <div style="background: #e8f4f8; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <strong>Live Sessions:</strong> ${courseInfo.schedule}<br>
                <strong>Duration:</strong> ${courseInfo.duration}<br>
                <strong>Platforms:</strong> Zoom (live classes) & Google Classroom (resources & assignments)
            </div>
            <p>All sessions are carefully designed to fit around your schedule while ensuring maximum learning impact. You'll have access to recorded sessions, so don't worry if you occasionally miss a live class!</p>
        </div>

        <div style="margin: 25px 0;">
            <div style="font-size: 18px; font-weight: 600; color: #2e4374; margin-bottom: 15px; border-left: 4px solid #00ffcc; padding-left: 12px;">💰 Investment in Your Future</div>
            <div style="background: linear-gradient(135deg, #00ffcc, #00d4aa); color: #1a1f2e; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <div style="font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 10px;">Total Program Cost: ${this.pricingInfo.total}</div>
                <div style="text-align: center; margin-bottom: 10px;">💡 Flexible Payment: ${this.pricingInfo.monthly} over ${this.pricingInfo.monthlyPeriod}</div>
                <div style="font-size: 14px; font-style: italic; text-align: center; opacity: 0.8;">${this.pricingInfo.justification}</div>
            </div>
        </div>

        <div style="margin: 25px 0;">
            <div style="font-size: 18px; font-weight: 600; color: #2e4374; margin-bottom: 15px; border-left: 4px solid #00ffcc; padding-left: 12px;">🚀 Next Steps</div>
            <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>While you wait for your admission confirmation:</strong></p>
                <ul style="padding-left: 20px;">
                    <li style="margin: 8px 0;">📱 Join our WhatsApp community for updates and networking</li>
                    <li style="margin: 8px 0;">📚 Check out our free resources to get a head start</li>
                    <li style="margin: 8px 0;">💻 Ensure your computer meets our technical requirements (we'll send details soon)</li>
                    <li style="margin: 8px 0;">🎯 Start thinking about your career goals and how this program will help you achieve them</li>
                </ul>
            </div>
        </div>

        <div style="margin: 25px 0;">
            <div style="font-size: 18px; font-weight: 600; color: #2e4374; margin-bottom: 15px; border-left: 4px solid #00ffcc; padding-left: 12px;">🌟 Stay Connected</div>
            <p>Join our growing community of tech enthusiasts and stay updated with the latest from NunyaCode Hub:</p>
            <div style="text-align: center; margin: 25px 0;">
                <a href="https://wa.me/233552121155" style="display: inline-block; background: #00ffcc; color: #1a1f2e; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 0 10px;">Join WhatsApp</a>
                <a href="https://x.com/nunyacodehub" style="display: inline-block; background: #00ffcc; color: #1a1f2e; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 0 10px;">Follow on X</a>
            </div>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p>Remember, every expert was once a beginner. Your journey to becoming a tech professional starts with this single step, and we're honored to guide you every step of the way.</p>
            
            <p>Welcome to the future. Welcome to NunyaCode Hub! 🌟</p>
            
            <div style="color: #6c7a89; font-style: italic;">
                Warm regards,<br>
                <strong>The NunyaCode Hub Team</strong><br>
                <em>Empowering African Tech Talent</em>
            </div>
        </div>
    </div>
</body>
</html>`;

        // Generate plain text version
        const plainText = `
NunyaCode Hub - Where Knowledge Meets Code

Hello ${fullName}!

We are absolutely thrilled to welcome you to the NunyaCode Hub family! Your journey into the exciting world of technology starts here.

COURSE CONFIRMATION
You've enrolled in: ${courseInfo.name}

APPLICATION STATUS
We have received your application and will review it within 5-7 business days.
Program Launch Date: July 7, 2025

PROGRAM OUTLINE (${courseInfo.duration}):
${courseInfo.outline.map((item) => `${item.weeks}: ${item.topic} - ${item.description}`).join("\n")}

SCHEDULE & PLATFORMS
Live Sessions: ${courseInfo.schedule}
Platforms: Zoom (live classes) & Google Classroom (resources)

INVESTMENT
Total Cost: ${this.pricingInfo.total}
Payment Option: ${this.pricingInfo.monthly} over ${this.pricingInfo.monthlyPeriod}

NEXT STEPS
- Join our WhatsApp community: https://wa.me/233552121155
- Follow us on X: https://x.com/nunyacodehub
- Prepare your computer for the program
- Start thinking about your career goals

Welcome to the future. Welcome to NunyaCode Hub!

The NunyaCode Hub Team
Empowering African Tech Talent
        `.trim();

        return {
            to: email,
            from: process.env.SENDGRID_FROM_EMAIL || "ericmorkli777@gmail.com",
            subject: `Welcome to NunyaCode Hub - Your ${courseInfo.name} Journey Begins! 🚀`,
            html: emailHTML,
            text: plainText,
            studentName: fullName,
            courseName: courseInfo.name,
        };
    },
};

// Function to send welcome email via SendGrid
async function sendWelcomeEmail(studentData) {
    try {
        if (!process.env.SENDGRID_API_KEY) {
            throw new Error("SendGrid API key not configured");
        }

        // Generate email content
        const emailMessage = emailTemplates.generateWelcomeEmail(studentData);

        // Send email via SendGrid
        const result = await sgMail.send(emailMessage);

        console.log("✅ Welcome email sent successfully!");
        console.log("To:", emailMessage.to);
        console.log("Subject:", emailMessage.subject);
        console.log("Student:", emailMessage.studentName);
        console.log("Course:", emailMessage.courseName);
        console.log("SendGrid Response:", result[0].statusCode);

        return {
            success: true,
            message: "Welcome email sent successfully",
            emailData: emailMessage,
        };
    } catch (error) {
        console.error("❌ Error sending welcome email:", error);

        if (error.response) {
            console.error("SendGrid error response:", error.response.body);
            console.error("Status code:", error.code);
            
            // Specific guidance for common errors
            if (error.code === 403) {
                console.error("🔧 Fix: Verify your sender email in SendGrid dashboard");
                console.error("📧 Current from email:", process.env.SENDGRID_FROM_EMAIL || "ericmorkli777@gmail.com");
            }
        }

        return {
            success: false,
            error: error.message,
            emailData: null,
            debugInfo: error.response ? {
                statusCode: error.code,
                body: error.response.body
            } : null
        };
    }
}

// Export functions for use in other modules
module.exports = {
    sendWelcomeEmail,
    emailTemplates,
};
