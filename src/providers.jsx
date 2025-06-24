import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"


const Providers = ({ children }) => {
    return <ThemeProvider>
        {children}
        <Toaster richColors />
    </ThemeProvider>
}

export default Providers