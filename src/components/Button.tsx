import clsx from "clsx"

type Props = JSX.IntrinsicElements["button"] & {}

const Button = ({ className, ...props }: Props) => {
	return (
		<button
			className={clsx([
				"h-full w-1/3 px-4 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-black appearance-none",
				className,
			])}
			{...props}
		/>
	)
}

export default Button
