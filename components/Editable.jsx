import { useEffect, useCallback, useRef, Fragment } from "react";

function editable(WrappedComponent, externalPath, noEditWrapper) {
  externalPath && console.log("\x1b[31m ~ externalPath", externalPath)
  // eslint-disable-next-line react/display-name
  return props => {
    if (process.env.NEXT_PUBLIC_APP_PREVIEW === "true") {
      const path = props?.path;
      if (path === undefined && externalPath === undefined) {
        return <WrappedComponent {...props} />
      }
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
        if (path && !props.noScrollTo) {
          window.addEventListener("message", handleScrollMessage);
          return () => {
            window.removeEventListener("message", handleScrollMessage);
          };
        }
      }, [handleScrollMessage, path]);

      return noEditWrapper ? (
        <WrappedComponent {...props} ref={divRef} data-editable-path={path}  />
      
        ) : (
          <div ref={divRef} data-editable-path={path} style={{border: 'blue 2px solid'}} >
            <WrappedComponent {...props} />
          </div>
        )
      
    } else {
      return <WrappedComponent {...props} />;
    }
  };
}

export default editable
