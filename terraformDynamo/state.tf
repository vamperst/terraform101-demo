terraform {
  backend "s3" {
    bucket = "serverless-talk-state"
    key    = "terraform101/Dynamos"
    region = "us-east-1"
  }
}
