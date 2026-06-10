
import FormTextInput from "../ui/FormTextInput"
import Button from "../ui/Button"
function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full max-w-[384px] h-full max-h-[380px] bg-white shoadow-md shadow-gray-300 rounded-2xl p-4">
        <div className="flex flex-col items-center gap-2 ">
<span className="text-2xl font-bold">ورود</span>
<span className="text-sm text-gray-500">لطفا برای ورود به سامانه، اطلاعات خود را وارد کنید.</span>
</div>
<div className="flex flex-col items-center gap-2">
<FormTextInput name="username" placeholder="نام کاربری" />
<FormTextInput name="password" placeholder="رمز عبور" />
</div>
<div className="flex flex-col items-center gap-2">
<Button type="submit" color="darkGreen" text="white" radius="md" size="md" width="auto">ورود</Button>
</div>

        </div>
    
  )
}

export default Login