import { useForm } from "react-hook-form";
import styled from "styled-components";

type FormData = {
  email: string;
  password: string;
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
`;

const Box = styled.div`
  background: rgba(255, 255, 255, 0.5);
  width: 800px;
  height: 400px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  color: black;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;

const Container = styled.form`
 padding: 0px 20px;
 display: flex;
 position: relative;
 left: 50px;
 width: 100%;
 height: auto;
 margin: 0 auto;
 margin-top: 80px;
 margin-bottom: 10px;
 background-color: ${(props) => props.theme.cardColor};
 flex-direction: column;
`;

const Input = styled.input`
    width: 200px;
		border: 1;
		border-radius: 10px;
		background-color: white;
		padding: 8px 15px;
		font-size: 20px;
		align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.textColor};
    margin-bottom:40px;
`;

const Button = styled.button`
    //right: 0;
		width: 40%;
		background-color: #ffff81;
		border: none;
		border-radius: 10px;
		font-size: 20px;
		color: ${(props) => props.theme.accentColor};
    margin-top: 50px;
    margin-left: 160px;      

`;

const P = styled.p`
    align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.textColor};
    flex-direction: column;
`;

const Label = styled.label`
  font-size:20px;
  color:black;
  margin-right:30px;
`;

function Login({
  onSubmit = (data: FormData) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(data));
        resolve();
      }, 1000);
    });
  },
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<FormData>(); // Specify the generic type here

  return (
    <Wrapper>
      <Box>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <P>
          <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="text"
          placeholder="test@email.com"
          aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
          {...register("email", {
            required: "        이메일은 필수 입력입니다.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "        이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.email && <small role="alert">{errors.email?.message}</small>}
        </P>
        <P>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          placeholder="****************"
          aria-invalid={
            !isDirty ? undefined : errors.password ? "true" : "false"
          }
          {...register("password", {
            required: "        비밀번호는 필수 입력입니다.",
            minLength: {
              value: 8,
              message: "        8자리 이상 비밀번호를 사용하세요.",
            },
          })}
        />
        {errors.password && (
          <small role="alert">{errors.password?.message}</small>
        )}
        </P>
        <Button type="submit" disabled={isSubmitting}>
          로그인 하기
        </Button>
      </Container>
      </Box>
    </Wrapper>
  );
}

export default Login;