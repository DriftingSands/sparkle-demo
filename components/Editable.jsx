import { useEffect, useCallback, useRef } from "react";

export const Editable = (WrappedComponent) => (props) => {
  if (process.env.NEXT_PUBLIC_APP_PREVIEW === 'true') {
    const path = props?.path;
    const divRef = useRef();
    

    const handleScrollMessage = useCallback((event) => {
      const message = event.data;
      if (path && divRef.current && message.type === "scrollToPath" && message.path === path) {
          divRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [path, divRef]);

    useEffect(() => {
      if (path) {
        window.addEventListener('message', handleScrollMessage);
        return () => {
          window.removeEventListener('message', handleScrollMessage);
        };
      }
    }, [handleScrollMessage, path]);

    return (
      path !== undefined
        ? <div ref={divRef} data-editable-path={path}>
            <WrappedComponent {...props} />
          </div>
        : <WrappedComponent {...props} />
    )
  } else {
    return <WrappedComponent {...props} />;
  }
}