import navigation from "./navigation"

export const redirectTo = (location: string) => {
    navigation.navigate(location)
}