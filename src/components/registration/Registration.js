import registratio_img from "./registration_img.png"
import "./Registration.css"
import reg_close from './reg_close.png'
import { useForm } from "react-hook-form"

export const Registration = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    console.log(watch("example")) // watch input value by passing the name of it

    return (
        <div className="registration">
            <div className="registration__wrapper">
                <div className="registration__close">
                    <img src={reg_close} />
                </div>
                <div className="registration__img">
                    <img src={registratio_img} />
                </div>
                <h2 className="registration__title">Registration</h2>
                <div >
                    <form className="registration__form"
                        onSubmit={handleSubmit(onSubmit)}>

                        <input className="registration__inp"
                            placeholder="Enter your username"
                            {...register("username", { required: true })}
                            aria-invalid={errors.username ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="registration__error" role="alert">Username name is required</p>
                        )}
                        <input className="registration__inp"
                            placeholder="Enter your password"
                            {...register("password", { required: "Password is required" })}
                            aria-invalid={errors.mail ? "true" : "false"}
                        />
                        {errors.password && <p className="registration__error" role="alert">{errors.password.message}</p>}

                        <button className="registration__btn" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}