import  {WifiOff} from "lucide-react";

interface OfflineVideoProps {
    username: string;
}

export const OfflineVideo = ({ username }: OfflineVideoProps) => {
    return (
        <div className="h-full flex flex-col space-y-4 justify-center items-center">
            <WifiOff className="h-10 w-10 text-gray-500" />
            <p className="text-gray-500">
                {username} is Offline
            </p>
        </div>
    );
}