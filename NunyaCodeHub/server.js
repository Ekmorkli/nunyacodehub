// NunyaCode Hub - Server with Email Integration
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { sendWelcomeEmail } = require('./email-service');

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory storage for enrollments (in production, use a proper database)
let enrollments = [];

// Load existing enrollments from file if it exists
const ENROLLMENTS_FILE = 'enrollments.json';
try {
    if (fs.existsSync(ENROLLMENTS_FILE)) {
        const data = fs.readFileSync(ENROLLMENTS_FILE, 'utf8');
        enrollments = JSON.parse(data);
        console.log(`📚 Loaded ${enrollments.length} existing enrollments`);
    }
} catch (error) {
    console.log('📚 No existing enrollments found, starting fresh');
}

// Function to save enrollments to file
function saveEnrollments() {
    try {
        fs.writeFileSync(ENROLLMENTS_FILE, JSON.stringify(enrollments, null, 2));
    } catch (error) {
        console.error('Error saving enrollments:', error);
    }
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files
app.use(express.static('.'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname, 'courses.html'));
});

app.get('/enroll', (req, res) => {
    res.sendFile(path.join(__dirname, 'enroll.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Enrollment endpoint with automatic email sending
app.post('/api/enroll', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, course, experience, motivation, newsletter, terms } = req.body;
        
        // Basic validation
        if (!firstName || !lastName || !email || !phone || !course || !terms) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email address'
            });
        }

        // Course validation
        const validCourses = ['data-analytics', 'web-design'];
        if (!validCourses.includes(course)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid course selection'
            });
        }

        // Prepare student data
        const studentData = {
            firstName,
            lastName,
            email,
            phone,
            course,
            experience: experience || 'Not specified',
            motivation: motivation || '',
            newsletter: newsletter === 'on',
            enrollmentDate: new Date().toISOString()
        };

        console.log('📝 New enrollment received:', {
            name: `${firstName} ${lastName}`,
            email,
            course
        });

        // Send welcome email
        const emailResult = await sendWelcomeEmail(studentData);
        
        // Store enrollment data
        enrollments.push(studentData);
        saveEnrollments();
        console.log('💾 Enrollment data stored for:', studentData.email);
        
        if (emailResult.success) {
            res.json({
                success: true,
                message: 'Enrollment successful! Welcome email sent.',
                studentName: `${firstName} ${lastName}`,
                course: course,
                emailSent: true
            });
        } else {
            // Even if email fails, enrollment is still successful
            console.warn('⚠️ Email sending failed, but enrollment recorded');
            
            res.json({
                success: true,
                message: 'Enrollment successful! Email will be sent shortly.',
                studentName: `${firstName} ${lastName}`,
                course: course,
                emailSent: false,
                emailError: emailResult.error
            });
        }

    } catch (error) {
        console.error('❌ Enrollment error:', error);
        
        res.status(500).json({
            success: false,
            error: 'Internal server error. Please try again later.'
        });
    }
});

// Check if student email exists and has password set up
app.post('/api/check-student-email', (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                error: 'Email is required'
            });
        }
        
        // Find student in enrollments
        const student = enrollments.find(e => e.email === email);
        
        if (!student) {
            return res.json({
                exists: false,
                hasPassword: false
            });
        }
        
        res.json({
            exists: true,
            hasPassword: !!student.passwordHash,
            studentName: `${student.firstName} ${student.lastName}`,
            course: student.course
        });
        
    } catch (error) {
        console.error('Email check error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        sendgridConfigured: !!process.env.SENDGRID_API_KEY
    });
});

// Admin API endpoints
app.get('/api/admin/enrollments', (req, res) => {
    try {
        res.json({
            success: true,
            enrollments: enrollments,
            total: enrollments.length
        });
    } catch (error) {
        console.error('❌ Error fetching enrollments:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch enrollments'
        });
    }
});

app.get('/api/admin/stats', (req, res) => {
    try {
        const stats = {
            total: enrollments.length,
            dataAnalytics: enrollments.filter(e => e.course === 'data-analytics').length,
            webDesign: enrollments.filter(e => e.course === 'web-design').length,
            todayEnrollments: enrollments.filter(e => {
                const today = new Date().toDateString();
                return new Date(e.enrollmentDate).toDateString() === today;
            }).length,
            courseBreakdown: {
                'data-analytics': enrollments.filter(e => e.course === 'data-analytics').length,
                'web-design': enrollments.filter(e => e.course === 'web-design').length
            }
        };

        res.json({
            success: true,
            stats: stats
        });
    } catch (error) {
        console.error('❌ Error generating stats:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate statistics'
        });
    }
});

// Add required modules for security
const crypto = require('crypto');
const session = require('express-session');

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'nunyacode-hub-secret-key-2025',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true in production with HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Rate limiting for login attempts
const loginAttempts = new Map();

function checkRateLimit(email) {
    const now = Date.now();
    const attempts = loginAttempts.get(email) || { count: 0, lastAttempt: now };
    
    // Reset if more than 15 minutes have passed
    if (now - attempts.lastAttempt > 15 * 60 * 1000) {
        attempts.count = 0;
    }
    
    return attempts.count < 5; // Max 5 attempts per 15 minutes
}

function recordLoginAttempt(email, success) {
    const now = Date.now();
    const attempts = loginAttempts.get(email) || { count: 0, lastAttempt: now };
    
    if (success) {
        loginAttempts.delete(email); // Clear on successful login
    } else {
        attempts.count++;
        attempts.lastAttempt = now;
        loginAttempts.set(email, attempts);
    }
}

// Hash password function
function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

// Generate salt
function generateSalt() {
    return crypto.randomBytes(32).toString('hex');
}

// Student password setup endpoint (for first-time login)
app.post('/api/student-setup-password', (req, res) => {
    try {
        const { email, newPassword } = req.body;
        
        if (!email || !newPassword) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }
        
        // Find student by email
        const studentIndex = enrollments.findIndex(e => e.email === email);
        
        if (studentIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }
        
        // Check if password is already set
        if (enrollments[studentIndex].passwordHash) {
            return res.status(400).json({
                success: false,
                error: 'Password already set for this account'
            });
        }
        
        // Password strength validation
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 8 characters long'
            });
        }
        
        // Generate salt and hash password
        const salt = generateSalt();
        const hashedPassword = hashPassword(newPassword, salt);
        
        // Update student record
        enrollments[studentIndex].passwordHash = hashedPassword;
        enrollments[studentIndex].passwordSalt = salt;
        enrollments[studentIndex].passwordSet = true;
        enrollments[studentIndex].lastLogin = new Date().toISOString();
        
        saveEnrollments();
        
        res.json({
            success: true,
            message: 'Password set successfully'
        });
        
    } catch (error) {
        console.error('Password setup error:', error);
        res.status(500).json({
            success: false,
            error: 'Password setup failed'
        });
    }
});

// Secure student portal authentication endpoint
app.post('/api/student-login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password required'
            });
        }
        
        // Check rate limiting
        if (!checkRateLimit(email)) {
            return res.status(429).json({
                success: false,
                error: 'Too many login attempts. Please try again in 15 minutes.'
            });
        }
        
        // Find student in enrollments
        const student = enrollments.find(e => e.email === email);
        
        if (!student) {
            recordLoginAttempt(email, false);
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        
        // Check if password is set up
        if (!student.passwordHash) {
            return res.status(200).json({
                success: false,
                requiresSetup: true,
                message: 'Please set up your password first'
            });
        }
        
        // Verify password
        const hashedPassword = hashPassword(password, student.passwordSalt);
        
        if (hashedPassword !== student.passwordHash) {
            recordLoginAttempt(email, false);
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        
        // Successful login
        recordLoginAttempt(email, true);
        
        // Create session
        req.session.studentId = student.email;
        req.session.isAuthenticated = true;
        
        // Update last login
        student.lastLogin = new Date().toISOString();
        saveEnrollments();
        
        res.json({
            success: true,
            student: {
                name: `${student.firstName} ${student.lastName}`,
                email: student.email,
                course: student.course,
                enrollmentDate: student.enrollmentDate,
                lastLogin: student.lastLogin
            }
        });
        
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({
            success: false,
            error: 'Authentication failed'
        });
    }
});

// Student logout endpoint
app.post('/api/student-logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: 'Logout failed'
            });
        }
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    });
});

// Middleware to protect student routes
function requireAuth(req, res, next) {
    if (!req.session.isAuthenticated || !req.session.studentId) {
        return res.status(401).json({
            success: false,
            error: 'Authentication required'
        });
    }
    next();
}

// Protected student data endpoint
app.get('/api/student-data', requireAuth, (req, res) => {
    try {
        const student = enrollments.find(e => e.email === req.session.studentId);
        
        if (!student) {
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }
        
        res.json({
            success: true,
            student: {
                name: `${student.firstName} ${student.lastName}`,
                email: student.email,
                course: student.course,
                enrollmentDate: student.enrollmentDate,
                lastLogin: student.lastLogin
            }
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch student data'
        });
    }
});

// Test email endpoint (for development)
app.post('/api/test-email', async (req, res) => {
    try {
        const testData = {
            firstName: 'Test',
            lastName: 'Student',
            email: req.body.email || 'test@example.com',
            course: req.body.course || 'data-analytics'
        };

        const result = await sendWelcomeEmail(testData);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 NunyaCode Hub server running on port ${PORT}`);
    console.log(`📧 SendGrid configured: ${!!process.env.SENDGRID_API_KEY}`);
    console.log(`🌐 Access at: http://localhost:${PORT}`);
});

module.exports = app;