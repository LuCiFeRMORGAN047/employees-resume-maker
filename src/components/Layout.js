export default  Layout = ({ children }) => (
    <Box
      css={{
        maxW: "100%",
        position: "relative",
        overflow: "visible scroll",
      }}
    >
      {children}
      <Content />
    </Box>
  );