import {
    Navbar,
    NavbarBrand,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";

export default function Nav() {

    const menuItems = [
        { label: "GitHub", href: "https://github.com/Amel294/2048" },
        { label: "My Projects", href: "https://www.amelumesh.com" },
    ];

    return (
        <Navbar  className="dark bg-black text-white">
           
            {/* Logo for mobile */}
            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <p className="font-bold text-inherit">2048</p>
                </NavbarBrand>
            </NavbarContent>

            {/* Desktop navigation with logo and menu items */}
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    <p className="font-bold text-inherit">2048</p>
                </NavbarBrand>
               
            </NavbarContent>

            {/* Button for GitHub */}
            <NavbarContent justify="end">
                {
                    menuItems.map( ( items ) => {
                        return (
                            <NavbarItem>
                                <Button as={Link} color="default" href={items.href} variant="flat">
                                    {items.label}
                                </Button>
                            </NavbarItem>
                        )
                    } )
                }
            </NavbarContent>

            {/* Mobile menu */}
            <NavbarMenu className="dark">
                {menuItems.map( ( item, index ) => (
                    <NavbarMenuItem key={index}>
                        <Link className="w-full text-white" href={item.href} size="lg">
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ) )}
            </NavbarMenu>
        </Navbar>
    );
}
