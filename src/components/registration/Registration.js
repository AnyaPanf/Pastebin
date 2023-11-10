import registratio_img from "./registration_img.png"
import eyeclosed from "./eyeclosed.png"
import eyeopened from "./eyeopened.png"
import "./Registration.css"
import reg_close from './reg_close.png'
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createUser } from "../../redux/action"

export const Registration = ({ handleReg }) => {
    const [showPass, setShowPass] = useState(false)

    const dispatch = useDispatch()
    const user = useSelector((state) => state.createUser)
    console.log(user)


    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        dispatch(createUser(data))
        console.log(data)
    }

    console.log(watch("username")) // watch input value by passing the name of it

    return (
        <div className="registration">
            <div className="registration__wrapper">
                <div className="registration__close" onClick={handleReg}>
                    <img src={reg_close} />
                </div>
                <div className="registration__img">
                    <img src={registratio_img} />
                    <div className="registration__color"></div>
                </div>
                <h2 className="registration__title">Registration</h2>
                <div >
                    <form className="registration__form"
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ "display": user ? "none" : "grid" }}
                    >
                        <input className="registration__inp"
                            placeholder="Enter your username"
                            {...register("username", { required: true })}
                            aria-invalid={errors.username ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="registration__error" role="alert">Username name is required</p>
                        )}
                        <input className="registration__inp"
                            placeholder="Enter your e-mail"
                            {...register("mail", { required: "E-mail is required" })}
                            aria-invalid={errors.mail ? "true" : "false"}
                        />
                        {errors.mail && <p className="registration__error" role="alert">{errors.mail.message}</p>}
                        <div className="registration__showpass">
                            <input className="registration__inp"
                                type={showPass ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password", { required: "Password is required", minLength: 8 })}
                                aria-invalid={errors.mail ? "true" : "false"}
                            />
                            <div className="registration__eye">
                                <img src={showPass ? eyeopened : eyeclosed} onClick={handleShowPass} />
                            </div>
                        </div>
                        {errors.password && <p className="registration__error" role="alert">{errors.password.message}</p>}

                        <button className="registration__btn" type="submit">Submit</button>
                    </form>
                    <div className="registration__thanks" style={{ "display": user ? "block" : "none" }}>
                        <p className="registration__registered">You are successfully registered</p>
                        <p className="registration__signin">Please sign in</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

