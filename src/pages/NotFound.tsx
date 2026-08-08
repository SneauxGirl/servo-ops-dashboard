import{ Box, Button, Container, Divider, Link, Stack, Typography } from "@mui/material"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link as RouterLink } from "react-router"

export function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Stack spacing={4} sx={{ alignItems: "center", textAlign: "center", }}>
        <Box>
          <Typography variant="overline" color="text.secondary">404</Typography>
          <Typography component="h1" variant="h4" sx={{ mt:1 }}>Page Not Found</Typography>
        </Box>
        <Button component={RouterLink} to="/work-orders" variant="outlined">
          Back to Work Orders
        </Button>
        <Divider />
        <Stack spacing={1.5} sx={{ alignItems: "center" }}>
          <Typography color="textSecondary">
            Developer: Heather Hugo
          </Typography>
          <Stack spacing={2} sx={{ alignItems: "flex-start",
          }}>
            <Link
              href="https://hjhugo.com"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
              }}
            >
              <LanguageOutlinedIcon fontSize="small" aria-hidden={true} />
              Portfolio
            </Link>
            <Link
              href="https://www.linkedin.com/in/hjhugo"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
              }}
            >
              <LinkedInIcon fontSize="small" aria-hidden={true} />
              LinkedIn
            </Link>
            <Link
              href="mailto:heatherh@liyudev.com"
              underline="hover"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
              }}
            >
              <EmailOutlinedIcon fontSize="small" aria-hidden={true} />
              Email
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
