import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Poppins', 'system-ui', 'sans-serif'],
			},
			colors: {
				// Core Design System
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				// Cosmic Background System
				cosmic: {
					void: 'hsl(var(--cosmic-void))',
					space: 'hsl(var(--deep-space))',
					mist: 'hsl(var(--nebula-mist))',
				},
				
				// Chakra Energy Colors - 7 Sacred Centers
				chakra: {
					root: 'hsl(var(--chakra-root))',
					sacral: 'hsl(var(--chakra-sacral))',
					solar: 'hsl(var(--chakra-solar))',
					heart: 'hsl(var(--chakra-heart))',
					throat: 'hsl(var(--chakra-throat))',
					'third-eye': 'hsl(var(--chakra-third-eye))',
					crown: 'hsl(var(--chakra-crown))',
				},
				
				// Glass System
				glass: {
					primary: 'rgb(var(--glass-primary))',
					secondary: 'rgb(var(--glass-secondary))',
					border: 'rgb(var(--glass-border))',
				},
				
				// Semantic Design Tokens
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backdropBlur: {
				xs: '2px',
				'4xl': '72px',
			},
			scale: {
				'98': '0.98',
				'102': '1.02',
				'105': '1.05',
			},
			keyframes: {
				// Existing animations
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				
				// Chakra Energy Animations
				'chakra-float': {
					'0%, 100%': { 
						transform: 'translateY(0px) rotate(0deg)', 
						opacity: '0.3' 
					},
					'50%': { 
						transform: 'translateY(-20px) rotate(180deg)', 
						opacity: '0.8' 
					}
				},
				'gradient-flow': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'liquid-shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'energy-pulse': {
					'0%, 100%': { 
						opacity: '0.3', 
						transform: 'scale(1)' 
					},
					'50%': { 
						opacity: '0.8', 
						transform: 'scale(1.1)' 
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'fade-slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'page-transition': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'liquid-glow': {
					'0%, 100%': { 
						opacity: '0.3',
						transform: 'scale(1)'
					},
					'50%': { 
						opacity: '0.8',
						transform: 'scale(1.05)'
					}
				},
				'liquid-flow': {
					'0%, 100%': { 
						backgroundPosition: '0% 50%',
						opacity: '0.3'
					},
					'50%': { 
						backgroundPosition: '100% 50%',
						opacity: '0.6'
					}
				}
			},
			animation: {
				// Existing animations
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				
				// Chakra Energy Animations
				'chakra-float': 'chakra-float 6s ease-in-out infinite',
				'gradient-flow': 'gradient-flow 8s ease infinite',
				'liquid-shimmer': 'liquid-shimmer 2s ease infinite',
				'energy-pulse': 'energy-pulse 3s ease-in-out infinite',
				'scale-in': 'scale-in 0.3s ease-out',
				'fade-slide-up': 'fade-slide-up 0.5s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'page-transition': 'page-transition 0.3s ease-out',
				'liquid-glow': 'liquid-glow 2s ease-in-out infinite',
				'liquid-flow': 'liquid-flow 4s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-cosmic': 'var(--gradient-cosmic)',
				'gradient-chakra': 'var(--gradient-chakra-flow)',
				'gradient-glass': 'var(--gradient-glass)',
			},
			boxShadow: {
				'glass': 'var(--shadow-glass)',
				'glass-hover': 'var(--shadow-glass-hover)',
				'chakra-glow': 'var(--shadow-chakra-glow)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
