if (process.env.NODE_ENV === 'production'){
    console.log("Environment: production")
} else if (process.env.NODE_ENV === 'local'){
    console.log("Environment: local")
} else {
    console.log("Environment:",process.env.NODE_ENV)
}
