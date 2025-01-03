import { Button } from "@/components/ui/button"

import { Logo } from "./logo"

export const Footer = () => {
    return(
        <div className="flex items-center w-fullp-6 bd-background z-50">
            <Logo/>
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
            <Button variant="ghost" size="sm" >
             Privacy policy
            </Button>
            <Button variant="ghost" size="sm" >
             Terms & conditions
            </Button>
            </div>
        </div>
    )
}