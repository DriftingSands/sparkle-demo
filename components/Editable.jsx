import { useEffect, useCallback, useRef } from "react";

function editable(WrappedComponent) {
  // next js useRouter doesn't seem to work in higher order components
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  // eslint-disable-next-line react/display-name
  return props => {
    if (searchParams.get("editMode") !== "true") {
      return <WrappedComponent {...props} />;
    }

    const path = props.path;

    const editableRef = useRef(null);

    const handleScrollMessage = useCallback(
      event => {
        const message = event.data;
        if (path && editableRef.current && message.type === "scrollToPath" && message.path === path) {
          const box = editableRef.current.getBoundingClientRect();
          // ignoring message if already inside panel
          if (box.top <= 0 && box.bottom >= window.innerHeight) {
            return;
          }
          // scrollTo clashes with gsap snap
          window.scrollBy({ top: box.top, left: 0, behavior: "smooth" });
        }
      },
      [path, editableRef]
    );

    useEffect(() => {
      if (path && !props.noScrollTo) {
        window.addEventListener("message", handleScrollMessage);
        return () => {
          window.removeEventListener("message", handleScrollMessage);
        };
      }
    }, [handleScrollMessage, path]);
    // const path = props?.path
    return <WrappedComponent {...props} data-editable-path={path} editableRef={editableRef} />;
  };
}

export default editable;
