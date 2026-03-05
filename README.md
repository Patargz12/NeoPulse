# 🌍 NovaWatch

**The dinosaurs didn't see it coming. We will.**

NovaWatch is a real-time asteroid detection and monitoring system that provides AI-powered analysis of Near-Earth Objects (NEOs). By leveraging NASA data and advanced visualization techniques, NovaWatch helps track asteroid trajectories, calculate potential impact risks, and assess Earth's current safety status.

![NovaWatch Banner](https://img.shields.io/badge/Status-Active%20Monitoring-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15.0-black) ![Three.js](https://img.shields.io/badge/Three.js-Powered-blue)

## ✨ Features

### 🌍 **Earth Pulse**
A real-time health check on Earth's safety. Earth Pulse analyzes nearby asteroid activity and delivers an AI-powered summary of how safe our planet is right now. Monitor the current threat level and get instant updates on potentially hazardous objects.

### 💥 **Impact Oracle**
Discover what would happen if an asteroid struck Earth. Using real NASA data, Impact Oracle calculates the hypothetical destruction level and paints a vivid picture of the aftermath. Understand the potential consequences of various impact scenarios.

### 🔬 **Stellar Autopsy**
Dissect any asteroid in detail. Stellar Autopsy examines all available NASA data on a selected object and delivers a complete AI-generated profile of its behavior and risk. Get comprehensive insights into asteroid composition, trajectory, and threat assessment.

## 🚀 Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **3D Visualization**: [Three.js](https://threejs.org) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
- **3D Components**: [@react-three/drei](https://github.com/pmndrs/drei)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Data Source**:  NASA NeoWs (Near Earth Object Web Service)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/novowatch.git
   cd novowatch
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key_here
   ```
   Get your NASA API key from [NASA API Portal](https://api.nasa.gov/)

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.


## 🎨 Key Components

### Scene Component
The main 3D scene that renders Earth, asteroids, satellites, and atmospheric effects.

### Earth Component
Interactive 3D Earth globe with realistic textures, rotation, and atmospheric glow.

### Asteroid Component
Dynamic asteroid visualization with real-time position tracking and threat indicators.

## 🌐 API Integration

NovaWatch integrates with NASA's Near-Earth Object Web Service (NeoWs) to fetch:
- Real-time asteroid data
- Orbital parameters
- Close approach information
- Hazard classifications
- Physical characteristics

## 🎯 Usage

1. **Explore the 3D Globe**: Interact with the Earth visualization using mouse controls
2. **Monitor Asteroids**: View real-time positions of NEOs relative to Earth
3. **Analyze Threats**: Use Earth Pulse to check current safety status
4. **Simulate Impacts**: Use Impact Oracle to understand potential scenarios
5. **Study Objects**: Use Stellar Autopsy for detailed asteroid analysis

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run cli` - Run CLI tools

### Adding Features

When adding new features, follow the existing structure:
1. Create components in `app/components/`
2. Add constants in `app/constants/`
3. Define types in `app/types/`
4. Add utility functions in `app/utils/`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NASA** - For providing the Near-Earth Object data through their public API
- **Three.js** - For the powerful 3D graphics library
- **PMND** - For the excellent React Three Fiber ecosystem
- **Next.js** - For the amazing React framework

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Remember**: The dinosaurs didn't have NovaWatch. You do. 🦕💫
