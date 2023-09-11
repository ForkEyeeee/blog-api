import { Box } from "@chakra-ui/react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const SignUp = () => {
  return (
    <Box>
      <form method="POST" action="/api/users/new">
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            type="text"
            placeholder="Enter in email format"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input name="password" type="password" />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input name="confirmpassword" type="password" />
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default SignUp;
