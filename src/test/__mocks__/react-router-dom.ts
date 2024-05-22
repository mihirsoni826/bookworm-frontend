import { vi } from "vitest";

const useNavigate = vi.fn();
const useLocation = () => ({
    pathname: "/mock-path",
    state: { someState: "mockState" },
});
const useParams = () => ({ id: "mockId" });
const useRouteMatch = () => ({ url: "/mock-url" });

const actual = await vi.importActual("react-router-dom");

export default {
    ...actual,
    useNavigate,
    useLocation,
    useParams,
    useRouteMatch,
};
