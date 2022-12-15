import { useEffect, useCallback, useRef } from "react";

function editable(WrappedComponent) {
  // eslint-disable-next-line react/display-name
  return props => {
    if (process.env.NEXT_PUBLIC_APP_PREVIEW === "true") {
      const path = props?.path;
      const divRef = useRef();

      const handleScrollMessage = useCallback(
        event => {
          const message = event.data;
          if (path && divRef.current && message.type === "scrollToPath" && message.path === path) {
            const box = divRef.current.getBoundingClientRect();
            // ignoring message if already inside panel
            if (box.top <= 0 && box.bottom >= window.innerHeight) {
              return;
            }
            // scrollTo clashes with gsap snap
            window.scrollBy({ top: box.top, left: 0, behavior: "smooth" });
          }
        },
        [path, divRef]
      );

      useEffect(() => {
        if (path) {
          window.addEventListener("message", handleScrollMessage);
          return () => {
            window.removeEventListener("message", handleScrollMessage);
          };
        }
      }, [handleScrollMessage, path]);

      return path !== undefined ? (
        <div ref={divRef} data-editable-path={path}>
          <WrappedComponent {...props} />
        </div>
      ) : (
        <WrappedComponent {...props} />
      );
    } else {
      return <WrappedComponent {...props} />;
    }
  };
}

export default editable
