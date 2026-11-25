import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { ApiError } from "@/lib/api";
import { signinOwner } from "@/lib/owner-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { signInSchema, type SignInFormData } from "./schema";

export default function SignInFormFields() {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      keepLoggedIn: true,
    },
    mode: "onTouched",
  });

  const handleFormSubmit = async (data: SignInFormData) => {
    setFormError("");
    try {
      await signinOwner({ email: data.email, password: data.password });
      navigate("/dashboard");
    } catch (err) {
      setFormError(
        err instanceof ApiError ? err.message : "Connexion impossible",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
      noValidate
    >
      <Field data-invalid={Boolean(errors.email)}>
        <FieldLabel className="mb-1.5 block text-sm font-semibold text-[var(--kree-ink)]">
          E-mail
        </FieldLabel>
        <Input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="vous@exemple.tn"
          aria-invalid={errors.email ? "true" : undefined}
          className="kree-auth-input h-12 rounded-2xl border-0 bg-[var(--kree-blue-soft)] px-4 text-[var(--kree-ink)] shadow-none ring-1 ring-[var(--kree-blue)]/10 focus-visible:ring-2 focus-visible:ring-[var(--kree-blue)]/35"
        />
        <FieldError errors={[errors.email]} />
      </Field>

      <Field data-invalid={Boolean(errors.password)}>
        <FieldLabel className="mb-1.5 block text-sm font-semibold text-[var(--kree-ink)]">
          Mot de passe
        </FieldLabel>
        <InputGroup className="h-12 overflow-hidden rounded-2xl bg-[var(--kree-blue-soft)] ring-1 ring-[var(--kree-blue)]/10 has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-[var(--kree-blue)]/35">
          <InputGroupInput
            {...register("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Votre mot de passe"
            aria-invalid={errors.password ? "true" : undefined}
            className="border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="button"
              size="icon-xs"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Masquer" : "Afficher"}
              className="text-[var(--kree-muted)]"
            >
              {showPassword ? (
                <EyeIcon className="text-current" />
              ) : (
                <EyeCloseIcon className="text-current" />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldError errors={[errors.password]} />
      </Field>

      <div className="flex items-center justify-between gap-3 pt-0.5">
        <Field orientation="horizontal" className="w-auto items-center gap-2.5">
          <Controller
            control={control}
            name="keepLoggedIn"
            render={({ field }) => (
              <Checkbox
                id="keep-logged-in"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
              />
            )}
          />
          <FieldLabel
            htmlFor="keep-logged-in"
            className="cursor-pointer text-sm font-normal text-[var(--kree-muted)]"
          >
            Se souvenir de moi
          </FieldLabel>
        </Field>
        <Link
          to="/signin"
          className="text-sm font-semibold text-[var(--kree-blue)] hover:underline"
        >
          Mot de passe oublié ?
        </Link>
      </div>

      {formError && (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[var(--kree-blue)] text-sm font-semibold text-white shadow-lg shadow-[var(--kree-blue)]/25 transition hover:brightness-110 disabled:opacity-60"
      >
        {isSubmitting ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
