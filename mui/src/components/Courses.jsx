import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button, Container,
} from "@mui/material";
import courses from "../assets/products";

const Courses = () => {
  return (
   <Container>
      <Box sx={{ my: "5rem" }} id="tech">
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Latest Courses
      </Typography>

      <Grid container spacing={2} sx={{ padding: 3, justifyContent: "center" }}>
        {courses.map((course, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card sx={{ maxWidth: 345, padding: 2 }}>
              <CardMedia
                title={course.title}
                image={course.image}
                component="img"
                height="200"
              />

              <CardContent>
                <Typography variant="h6" color="initial">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.desc}
                </Typography>
                <Typography variant="h4" color="secondary">
                  {course.price}
                </Typography>
                <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                  Enroll NoW
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
   </Container>
  );
};

export default Courses;
