import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import findInputError from "../../utils/findInputError";
import isFormInvalid from "../../utils/isFormInvalid";

function Input(props: any) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, props.name);
  const isInvalid = isFormInvalid(inputError);

  return (
    <>
      <div
        style={{
          position: "absolute",
          marginTop: "-24px",
          marginLeft: "260px",
          color: "red",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError message="Hibás beviteli érték" key="required" />
          )}
        </AnimatePresence>
      </div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={props.className}
        {...register(props.name, {
          required: {
            value: true,
            message: "required",
          },
        })}
        name={props.name}
        onChange={props.onChange}
      />
    </>
  );
}

export default Input;

function InputError(props: any) {
  return (
    <>
      <motion.p {...framer_error}>{props.message}</motion.p>
    </>
  );
}

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
