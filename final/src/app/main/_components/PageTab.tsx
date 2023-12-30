"use client";

import { Tab, Tabs } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter, useSearchParams } from "next/navigation";

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
});


export default function PageTab() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const handleOnClick1 = () => {
      params.set("mode", "buyer"!);
      router.push(`/main/shop?${params.toString()}`);
    }

    const handleOnClick2 = () => {
      params.set("mode", "seller"!);
      router.push(`/main/warehouse?${params.toString()}`);
    }
    
    return(
        <div className="w-full border-l-2 border-r-2">
            <ThemeProvider theme={theme}>
                <Tabs value={params.get("mode")} indicatorColor="primary">
                    <Tab label="Buyer Mode" value={"buyer"} onClick={handleOnClick1}/>
                    <Tab label="Seller Mode" value={"seller"} onClick={handleOnClick2}/>
                </Tabs>
            </ThemeProvider>
        </div>
    );
}