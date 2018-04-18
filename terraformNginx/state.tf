terraform {
  backend "s3" {
    bucket = "serverless-talk-state"
    key    = "terraform101/Nginx"
    region = "us-east-1"
  }
}
