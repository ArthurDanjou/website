declare module '#auth-utils' {
	interface UserSession {
		user: {
			email: string
			username: string
			picture: string
			admin: boolean
		}
	}
}
