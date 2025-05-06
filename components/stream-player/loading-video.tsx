import  {Loader} from "lucide-react";

interface LoadingVideoProps {
    label: string;
}

export const LoadingVideo = ({ label }: LoadingVideoProps) => {
    return (
        <div className="h-full flex flex-col space-y-4 justify-center items-center">
            <Loader className="h-10 w-10 text-gray-500 animate-spin" />
            <p className="text-gray-500 capitalize">
                {label}
            </p>
        </div>
    );
}