<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI-Enhanced Steganography Explorer

A comprehensive web application for exploring and demonstrating advanced steganography techniques, powered by AI analysis and multi-domain workflows. This application enables secure data embedding into digital images using cutting-edge methods like Quaternion Exponent Moments (QEM) and AI-driven forensic analysis.

## 🌟 Key Features

### 🔐 Security & Access Control

- **Multi-Factor Authentication (MFA)**: Enhanced security with TOTP-based MFA
- **Role-Based Access Control (RBAC)**: Domain-specific permissions for General, Medical, and Military workflows
- **Audit Logging**: Comprehensive tracking of all user actions and data access
- **Encryption Support**: AES-256-GCM encryption for sensitive data

### 🖼️ Steganography Capabilities

- **Multiple Embedding Techniques**:
  - QEM-Based Color Conversion (Standard)
  - Generative Latent Space Embedding
  - Frequency Domain (DCT/DWT) Methods
- **AI-Powered Analysis**: Gemini AI integration for:
  - Cover image suitability assessment
  - Forensic report generation
  - Expert steganography analysis
- **Multi-Format Support**: Hide files, text, and images within cover images

### 📊 Advanced Analytics

- **Quality Metrics**: PSNR, SSIM, MSE, and BER calculations
- **Forensic Reports**: AI-generated analysis of extraction success and data integrity
- **Attack Simulation**: Test robustness against compression and noise attacks

### 🏥 Domain-Specific Workflows

- **General/Civilian**: Personal files, documents, media
- **Medical/Healthcare**: Patient records, DICOM files, imaging data
- **Military/Intelligence**: Classified documents, telemetry, reconnaissance data

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **AI Integration**: Google Gemini 2.5 Flash API
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React hooks and local storage
- **Build Tool**: Vite with React plugin
- **Development**: Hot reload, TypeScript compilation

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Google Gemini API key

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-enhanced-steganography-explorer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env.local` file in the root directory:

```env
API_KEY=your_gemini_api_key_here
```

> **Note**: Obtain your Gemini API key from [Google AI Studio](https://ai.studio).

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📖 Usage Guide

### Authentication & Access

1. **Register**: Create a new account with domain-specific access
2. **Login**: Authenticate with username/password
3. **MFA**: Complete two-factor authentication using TOTP
4. **Dashboard**: Access domain-appropriate workflows based on your clearance level

### General Workflow (Sender)

1. **Upload Cover Image**: Select a high-quality image suitable for data hiding
2. **AI Cover Analysis**: Use Gemini AI to assess image suitability (1-10 score)
3. **Select Payload**: Choose between:
   - Files & Text (documents, media, messages)
   - Image-in-Image embedding
4. **Choose Technique**: Select embedding method (Standard, Generative, Frequency)
5. **Process & Download**: Generate steganographic package for transmission

### General Workflow (Receiver)

1. **Upload Package**: Load the received steganographic image
2. **Extract Data**: Recover hidden files, text, or images
3. **Forensic Analysis**: Generate AI-powered reports on extraction quality
4. **Verify Integrity**: Check data integrity and authenticity

### Domain-Specific Features

- **Medical**: Supports DICOM, HL7, TIFF formats with healthcare compliance
- **Military**: Top-secret clearance required, supports KML, SHP, encrypted formats

## 🏗️ Architecture Overview

### Application Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Custom button component
│   ├── ImageUploader.tsx # File upload interface
│   ├── ImageStage.tsx   # Image display with filters
│   ├── Layout.tsx      # Main application layout
│   └── ...
├── pages/              # Route-based page components
│   ├── Home.tsx        # Dashboard with workflow selection
│   ├── Sender.tsx      # Data embedding interface
│   ├── Receiver.tsx    # Data extraction interface
│   ├── Login.tsx       # Authentication page
│   └── ...
├── services/           # External service integrations
│   ├── geminiService.ts # AI analysis functions
│   ├── database.ts     # Data persistence layer
│   └── security.ts     # Security utilities
├── types.ts            # TypeScript type definitions
├── hooks/              # Custom React hooks
└── App.tsx             # Main application component
```

### Data Flow

1. **Authentication**: User credentials → MFA → Session management
2. **Embedding**: Cover Image + Secret Data → Processing → Stego Package
3. **Transmission**: Grayscale conversion → Download → Secure transfer
4. **Extraction**: Package upload → AI Analysis → Data recovery
5. **Forensics**: Metrics calculation → Gemini AI → Detailed reports

### Security Model

- **RBAC**: Domain-based access control with clearance levels
- **Encryption**: AES-256-GCM for data at rest and in transit
- **Audit Trail**: Comprehensive logging of all operations
- **MFA**: TOTP-based two-factor authentication

## 🤝 Contributing

We welcome contributions to enhance the AI-Enhanced Steganography Explorer!

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and ensure tests pass
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature`
6. Submit a pull request

### Guidelines

- Follow TypeScript best practices
- Maintain consistent code style
- Add tests for new features
- Update documentation as needed
- Ensure security compliance for sensitive features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [View in AI Studio](https://ai.studio/apps/drive/1eiC04GyTH64OOJluM8VYGqToW94T9vyU)
- [Google Gemini AI](https://ai.google.dev/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

---

**Disclaimer**: This application is for educational and research purposes. Ensure compliance with applicable laws and regulations when using steganography techniques.
