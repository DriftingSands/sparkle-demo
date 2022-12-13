import { useEffect, useCallback, useRef } from "react";

// eslint-disable-next-line react/display-name
export const Editable = (WrappedComponent) => (props) => {
  if (process.env.NEXT_PUBLIC_APP_PREVIEW === 'true') {
    const path = props?.path;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const divRef = useRef();
    

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleScrollMessage = useCallback((event) => {
      const message = event.data;
      if (path && divRef.current && message.type === "scrollToPath" && message.path === path) {
          divRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [path, divRef]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
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
