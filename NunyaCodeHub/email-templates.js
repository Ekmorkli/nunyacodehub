// NunyaCode Hub - Email Template System
// Dynamic welcome email generator with course-specific content

class EmailTemplateSystem {
    constructor() {
        this.courseData = {
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
        };

        this.pricingInfo = {
            total: "300 GHS",
            monthly: "100 GHS/month",
            monthlyPeriod: "3 months",
            justification:
                "This investment supports our world-class instructors, cutting-edge learning platforms, and comprehensive career support services that make NunyaCode Hub the premier tech training destination in Africa.",
        };
    }

    generateWelcomeEmail(studentData) {
        const { firstName, lastName, email, course } = studentData;
        const fullName = `${firstName} ${lastName}`;
        const courseInfo = this.courseData[course];

        if (!courseInfo) {
            throw new Error(`Course "${course}" not found in template system`);
        }

        const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to NunyaCode Hub - Your Tech Journey Begins!</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1a1f2e;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .email-container {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #00ffcc;
        }
        .logo {
            font-family: 'Orbitron', monospace;
            font-size: 24px;
            font-weight: 900;
            color: #00ffcc;
            margin-bottom: 10px;
        }
        .tagline {
            color: #6c7a89;
            font-style: italic;
        }
        .greeting {
            font-size: 18px;
            color: #2e4374;
            margin-bottom: 20px;
        }
        .course-highlight {
            background: linear-gradient(135deg, #2e4374, #4a2c6f);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
        }
        .course-name {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .section {
            margin: 25px 0;
        }
        .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #2e4374;
            margin-bottom: 15px;
            border-left: 4px solid #00ffcc;
            padding-left: 12px;
        }
        .outline-item {
            background: #f8f9fa;
            padding: 15px;
            margin: 10px 0;
            border-radius: 6px;
            border-left: 3px solid #00ffcc;
        }
        .outline-weeks {
            font-weight: 600;
            color: #2e4374;
        }
        .outline-topic {
            font-weight: 500;
            color: #1a1f2e;
            margin: 5px 0;
        }
        .outline-description {
            color: #6c7a89;
            font-size: 14px;
        }
        .pricing-box {
            background: linear-gradient(135deg, #00ffcc, #00d4aa);
            color: #1a1f2e;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .price-main {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
        }
        .price-option {
            text-align: center;
            margin-bottom: 10px;
        }
        .price-justification {
            font-size: 14px;
            font-style: italic;
            text-align: center;
            opacity: 0.8;
        }
        .schedule-info {
            background: #e8f4f8;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
        }
        .next-steps {
            background: #f0f8ff;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .next-steps ul {
            padding-left: 20px;
        }
        .next-steps li {
            margin: 8px 0;
        }
        .social-links {
            text-align: center;
            margin: 25px 0;
        }
        .social-button {
            display: inline-block;
            background: #00ffcc;
            color: #1a1f2e;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 0 10px;
        }
        .closing {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        .signature {
            color: #6c7a89;
            font-style: italic;
        }
        .launch-date {
            background: #fff3cd;
            color: #856404;
            padding: 15px;
            border-radius: 6px;
            text-align: center;
            margin: 20px 0;
            border: 1px solid #ffeaa7;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">NunyaCode Hub</div>
            <div class="tagline">Where Knowledge Meets Code</div>
        </div>

        <div class="greeting">
            Hello ${fullName}! 🎉
        </div>

        <p>We are absolutely thrilled to welcome you to the NunyaCode Hub family! Your journey into the exciting world of technology starts here, and we couldn't be more excited to be part of your transformation.</p>

        <div class="course-highlight">
            <div class="course-name">${courseInfo.name}</div>
            <div>You've chosen an incredible path that will equip you with industry-relevant skills and open doors to amazing opportunities in Africa's growing tech ecosystem.</div>
        </div>

        <div class="section">
            <div class="section-title">📋 Application Confirmation</div>
            <p>We have successfully received your application for the <strong>${courseInfo.name}</strong> program. Our admissions team will review your application within <strong>5-7 business days</strong> and get back to you with next steps.</p>
            
            <div class="launch-date">
                <strong>🚀 Program Launch Date: July 7, 2025</strong><br>
                Mark your calendar! This is when your transformation begins.
            </div>
        </div>

        <div class="section">
            <div class="section-title">🎯 Your ${courseInfo.name} Journey</div>
            <p>Here's what you can expect over the next ${courseInfo.duration}:</p>
            
            ${courseInfo.outline
                .map(
                    (item) => `
                <div class="outline-item">
                    <div class="outline-weeks">${item.weeks}</div>
                    <div class="outline-topic">${item.topic}</div>
                    <div class="outline-description">${item.description}</div>
                </div>
            `,
                )
                .join("")}
        </div>

        <div class="section">
            <div class="section-title">📅 Schedule & Learning Platforms</div>
            <div class="schedule-info">
                <strong>Live Sessions:</strong> ${courseInfo.schedule}<br>
                <strong>Duration:</strong> ${courseInfo.duration}<br>
                <strong>Platforms:</strong> Zoom (live classes) & Google Classroom (resources & assignments)
            </div>
            <p>All sessions are carefully designed to fit around your schedule while ensuring maximum learning impact. You'll have access to recorded sessions, so don't worry if you occasionally miss a live class!</p>
        </div>

        <div class="section">
            <div class="section-title">💰 Investment in Your Future</div>
            <div class="pricing-box">
                <div class="price-main">Total Program Cost: ${this.pricingInfo.total}</div>
                <div class="price-option">💡 Flexible Payment: ${this.pricingInfo.monthly} over ${this.pricingInfo.monthlyPeriod}</div>
                <div class="price-justification">${this.pricingInfo.justification}</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">🚀 Next Steps</div>
            <div class="next-steps">
                <p><strong>While you wait for your admission confirmation:</strong></p>
                <ul>
                    <li>📱 Join our WhatsApp community for updates and networking</li>
                    <li>📚 Check out our free resources to get a head start</li>
                    <li>💻 Ensure your computer meets our technical requirements (we'll send details soon)</li>
                    <li>🎯 Start thinking about your career goals and how this program will help you achieve them</li>
                </ul>
            </div>
        </div>

        <div class="section">
            <div class="section-title">🌟 Stay Connected</div>
            <p>Join our growing community of tech enthusiasts and stay updated with the latest from NunyaCode Hub:</p>
            <div class="social-links">
                <a href="https://wa.me/233552121155" class="social-button">Join WhatsApp</a>
                <a href="https://x.com/nunyacodehub" class="social-button">Follow on X</a>
            </div>
        </div>

        <div class="closing">
            <p>Remember, every expert was once a beginner. Your journey to becoming a tech professional starts with this single step, and we're honored to guide you every step of the way.</p>
            
            <p>Welcome to the future. Welcome to NunyaCode Hub! 🌟</p>
            
            <div class="signature">
                Warm regards,<br>
                <strong>The NunyaCode Hub Team</strong><br>
                <em>Empowering African Tech Talent</em>
            </div>
        </div>
    </div>
</body>
</html>`;

        return {
            to: email,
            subject: `Welcome to NunyaCode Hub - Your ${courseInfo.name} Journey Begins! 🚀`,
            html: template,
            text: this.generatePlainTextVersion(studentData, courseInfo),
        };
    }

    generatePlainTextVersion(studentData, courseInfo) {
        const { firstName, lastName } = studentData;
        const fullName = `${firstName} ${lastName}`;

        return `
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
- Join our WhatsApp community: https://chat.whatsapp.com/GFNHT0Pru0zCQgw9cc2HnW
- Follow us on X: https://x.com/nunyacodehub
- Prepare your computer for the program
- Start thinking about your career goals

Welcome to the future. Welcome to NunyaCode Hub!

The NunyaCode Hub Team
Empowering African Tech Talent
        `.trim();
    }
}

// Usage example and testing
const emailSystem = new EmailTemplateSystem();

// Function to send welcome email (simulation)
function sendWelcomeEmail(studentData) {
    try {
        const emailContent = emailSystem.generateWelcomeEmail(studentData);

        // In a real implementation, this would integrate with an email service
        console.log("Email generated successfully!");
        console.log("To:", emailContent.to);
        console.log("Subject:", emailContent.subject);

        // Simulate email sending
        setTimeout(() => {
            console.log(
                `Welcome email sent to ${studentData.firstName} ${studentData.lastName} (${studentData.email})`,
            );
            console.log(
                `Course: ${emailSystem.courseData[studentData.course].name}`,
            );
        }, 1000);

        return emailContent;
    } catch (error) {
        console.error("Error generating email:", error.message);
        return null;
    }
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
    module.exports = { EmailTemplateSystem, sendWelcomeEmail };
}
