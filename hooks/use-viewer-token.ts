import {toast} from "sonner";
import {useEffect, useState} from "react";
import {JwtPayload, jwtDecode} from "jwt-decode";
import {createViewerToken} from "@/actions/token";

/**
 * Custom React hook to generate and manage a viewer token based on the provided host identity.
 *
 * This hook asynchronously creates a viewer token using the given `hostIdentity`, decodes it to extract
 * the user's name and identity, and manages these values in local state. If token creation fails,
 * an error toast is displayed.
 *
 * @param hostIdentity - The identity of the host for whom the viewer token is to be created.
 * @returns An object containing the generated `token`, the user's `name`, and their `identity`.
 */
export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViewerToken(hostIdentity);
                setToken(viewerToken);
                const decodedToken = jwtDecode(viewerToken) as JwtPayload & { name?: string }
                const name = decodedToken?.name;
                const identity = decodedToken.sub;
                if (identity) {
                    setIdentity(identity);
                }
                if (name) {
                    setName(name);
                }
            } catch {
                toast.error("Failed to create token");
            }
        }
        createToken()
    }, [hostIdentity]);

    return { token, name, identity };
}