import { Input, Form, Button } from "antd"
import { useLogin } from "../hooks/mutation"
import { useNavigate } from "react-router-dom"

import type { LoginInput } from "../types"

const Index :React.FC = () =>{

    const navigate = useNavigate()

    const [form] = Form.useForm();

  const { mutate  } = useLogin(() => {
    
    navigate("/super-admin-panel")  
    
  });

  const onFinish = (values: LoginInput) => {
    mutate(values);
  };


    return(
        <div className="w-full h-[100vh] flex justify-center items-center">
            <Form 
                form={form}
                name="sign_in"
                onFinish={onFinish}

                style={{
                    maxWidth:"600px",
                    width:"340px",
                    display: "flex",
                    flexDirection:"column"
                }}
            
            >
                <Form.Item
                    label="Username"
                    name= "username"
                    labelCol={{span:24}}
                    wrapperCol={{span:24}}
                    style={{marginBottom: "8px"}}
                    rules={[{required:true, message:"Please input username!"}]}
                >
                    <Input style={{height: "40px"}} status="error" className="px-2 border-[1.5px]" />

                </Form.Item>
                <Form.Item
                    label="Password"
                    name= "password"
                    labelCol={{span:24}}
                    wrapperCol={{span:24}}
                    style={{marginBottom: "8px"}}
                    rules={[{required:true, message:"Please input username!"}]}
                >
                    <Input style={{height: "40px"}} status="error" className="px-2 border-[1.5px]" />

                </Form.Item>
                <Form.Item>
                    <Button block htmlType="submit" style={{backgroundColor:"#050556", color: "white", height:"40px", fontSize:"18px", marginTop:"10px"}}>
                        Sign in
                    </Button>
                </Form.Item>

            </Form>
        </div>
        
    )
}

export default Index