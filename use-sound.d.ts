declare module 'use-sound' {
	// Оголошення типу для функції play
	type PlayFunction = () => void

	// Оголошення типу для хука useSound
	export default function useSound(soundUrl: string): [PlayFunction]
}
